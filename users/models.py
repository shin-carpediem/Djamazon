from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.core.mail import send_mail
from django.utils import timezone
# https://qiita.com/dai-takahashi/items/57421ea191ab89175e9e
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill
from app.models import Product

# Create your models here.


class UserManager(BaseUserManager):
    # カスタムユーザーマネージャー
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        # email を必須にする
        if not email:
            raise ValueError('The given email must be set')
        # email で User モデルを作成
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self.db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True')
        return self._create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    initial_point = 50000
    # カスタムユーザーモデル
    email = models.EmailField("email_address", unique=True)
    point = models.PositiveIntegerField(default=initial_point)
    fav_products = models.ManyToManyField(Product, blank=True)
    is_staff = models.BooleanField("is_staff", default=False)
    is_active = models.BooleanField("is_active", default=True)
    date_joined = models.DateTimeField("date_joined", default=timezone.now)
    is_img = models.ImageField(
        "is_img", upload_to="is_img", max_length=50, blank=True, null=True)
    resized_img = ImageSpecField(source="is_img",
                                 processors=[ResizeToFill(100, 100)],
                                 format="JPEG",
                                 options={"quality": 60}
                                 )

    objects = UserManager()

    USERNAME_FIELD = "email"
    EMAIL_FIELD = "email"
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = "user"
        verbose_name_plural = "users"
