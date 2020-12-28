from django.core.mail import send_mail


subject = "題名"
message = "hogehoge"
from_email = 'buru.aoshin@gmail.com'
recipient_list = ["buru.aoshin@gmail.com"]

send_mail(subject, message, from_email, recipient_list)
