# from django.urls import reverse, resolve
from django.test import TestCase
# from users.models import UserManager, User
# from .forms import CustomUserCreationForm
# from .views import index, signup


# https://codelab.website/django-testcode/
# https://selfs-ryo.com/detail/django_test_1
# https://wonderwall.hatenablog.com/entry/2018/03/21/190000
# # Create your tests here.
# class TestIndex(TestCase):
#     def setUp(self):
#         # テスト実行前の処理
#         # ログイン可能なユーザを1名追加しておきます
#         UserManager._create_user(self=self,
#                                  email='test@test.com',
#                                  password='test')

#     def TestIndex(self):
#         # indexの画面へアクセスできるかどうかをテストする
#         # この画面はログインしているユーザ出ないとアクセスできません
#         client = self.client

#         # まずはログインしていないユーザがアクセスした場合
#         response = client.get('/')
#         # ステータスコード：302が返却され画面にアクセスできない
#         self.assertEqual(response.status_code, 302)

#         # setUpで追加しておいたユーザでログインします]
#         client.signup(email='test@test.com', password='test')
#         # ログインしているユーザがアクセスした場合
#         response = client.get('/')
#        # ステータスコード：200が返却され画面にアクセスできている
#         self.assertEqual(response.status_code, 200)


# class SignupTests(TestCase):
#     def setUp(self):
#         url = reverse('signup')
#         self.response = self.client.get(url)

#     def test_signup_status_code(self):
#         self.assertAlmostEquals(self.response.status_code, 200)
