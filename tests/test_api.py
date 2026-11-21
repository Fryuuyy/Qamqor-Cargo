"""Basic API tests using an isolated SQLite database."""
import os
import tempfile
import unittest
from fastapi.testclient import TestClient

_fd, _db_path = tempfile.mkstemp(suffix=".db")
os.close(_fd)
os.environ["DATABASE_URL"] = f"sqlite:///{_db_path}"
os.environ["JWT_SECRET"] = "test-secret-for-unit-tests-only"
os.environ["ADMIN_EMAIL"] = "admin@example.com"
os.environ["ADMIN_PASSWORD"] = "AdminPass123!"

from app.database import Base, engine, SessionLocal
from app.main import app
from app.models import User
from app.security import hash_password

class TransportApiTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        Base.metadata.create_all(bind=engine)
        db=SessionLocal()
        db.add(User(full_name="Test Admin",email="admin@example.com",phone="+77000000000",password_hash=hash_password("AdminPass123!"),role="admin"))
        db.commit();db.close()
        cls.client=TestClient(app)
        cls.admin_token=cls.client.post("/api/auth/login",json={"email":"admin@example.com","password":"AdminPass123!"}).json()["access_token"]

    def setUp(self):
        self.customer_email=f"user{ id(self) }@example.com"
        response=self.client.post("/api/auth/register",json={"full_name":"Test Customer","email":self.customer_email,"phone":"+77001112233","password":"Customer123!"})
        self.assertEqual(response.status_code,201)
        self.token=response.json()["access_token"]
        self.headers={"Authorization":f"Bearer {self.token}"}

    def test_health_and_home(self):
        self.assertEqual(self.client.get("/health").status_code,200)
        self.assertEqual(self.client.get("/").status_code,200)

    def test_register_duplicate_email(self):
        response=self.client.post("/api/auth/register",json={"full_name":"Another User","email":self.customer_email,"phone":"+77001112233","password":"Customer123!"})
        self.assertEqual(response.status_code,409)

    def test_create_request_and_list_own(self):
        payload={"origin":"Көкшетау","destination":"Астана","cargo_type":"Жиһаз","weight_kg":500,"transport_date":"2099-12-25","phone":"+77001112233","comment":"Тест өтінімі"}
        created=self.client.post("/api/requests",json=payload,headers=self.headers)
        self.assertEqual(created.status_code,201,created.text)
        self.assertTrue(created.json()["request_number"].startswith("TR-"))
        listed=self.client.get("/api/requests/my",headers=self.headers)
        self.assertEqual(listed.status_code,200)
        self.assertEqual(listed.json()["total"],1)

    def test_customer_cannot_open_admin_list(self):
        response=self.client.get("/api/requests/admin/all",headers=self.headers)
        self.assertEqual(response.status_code,403)

    def test_admin_can_confirm_request(self):
        payload={"origin":"Көкшетау","destination":"Астана","cargo_type":"Жиһаз","weight_kg":100,"transport_date":"2099-12-25","phone":"+77001112233"}
        created=self.client.post("/api/requests",json=payload,headers=self.headers)
        request_id=created.json()["id"]
        headers={"Authorization":f"Bearer {self.admin_token}"}
        changed=self.client.patch(f"/api/requests/{request_id}/status",json={"status":"confirmed"},headers=headers)
        self.assertEqual(changed.status_code,200,changed.text)
        self.assertEqual(changed.json()["status"],"confirmed")

    def test_customer_can_cancel_pending_request(self):
        payload={"origin":"Көкшетау","destination":"Астана","cargo_type":"Жиһаз","weight_kg":120,"transport_date":"2099-12-25","phone":"+77001112233"}
        created=self.client.post("/api/requests",json=payload,headers=self.headers)
        response=self.client.post(f"/api/requests/{created.json()['id']}/cancel",headers=self.headers)
        self.assertEqual(response.status_code,200,response.text)
        self.assertEqual(response.json()["status"],"cancelled")

    def test_customer_cannot_read_another_customers_request(self):
        payload={"origin":"Көкшетау","destination":"Астана","cargo_type":"Жиһаз","weight_kg":120,"transport_date":"2099-12-25","phone":"+77001112233"}
        created=self.client.post("/api/requests",json=payload,headers=self.headers)
        other=self.client.post("/api/auth/register",json={"full_name":"Other Customer","email":f"other{ id(self) }@example.com","phone":"+77002223344","password":"Customer123!"})
        other_headers={"Authorization":f"Bearer {other.json()['access_token']}"}
        response=self.client.get(f"/api/requests/{created.json()['id']}",headers=other_headers)
        self.assertEqual(response.status_code,404)

    def test_invalid_weight_rejected(self):
        payload={"origin":"Көкшетау","destination":"Астана","cargo_type":"Жиһаз","weight_kg":0,"transport_date":"2099-12-25","phone":"+77001112233"}
        response=self.client.post("/api/requests",json=payload,headers=self.headers)
        self.assertEqual(response.status_code,422)

    @classmethod
    def tearDownClass(cls):
        cls.client.close()
        try: os.remove(_db_path)
        except OSError: pass

if __name__ == "__main__":
    unittest.main(verbosity=2)
