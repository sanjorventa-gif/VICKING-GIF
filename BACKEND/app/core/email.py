import logging
import aiosmtplib
from email.message import EmailMessage
from typing import Any, Dict, Optional
from jinja2 import Environment, FileSystemLoader
from app.core.config import settings
import os

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Setup Jinja2 Environment
templates_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "templates")
env = Environment(loader=FileSystemLoader(templates_dir))

async def send_email(
    email_to: str,
    subject: str = "",
    template_name: str = "",
    environment: Dict[str, Any] = {},
    reply_to: Optional[str] = None
) -> None:
    """
    Send an email asynchronously using aiosmtplib.
    """
    assert settings.EMAILS_FROM_EMAIL, "EMAILS_FROM_EMAIL must be set"

    try:
        message = EmailMessage()
        message["Subject"] = subject
        message["From"] = f"{settings.EMAILS_FROM_NAME} <{settings.EMAILS_FROM_EMAIL}>"
        message["To"] = email_to
        
        if reply_to:
            message["Reply-To"] = reply_to

        # Render Template
        template = env.get_template(template_name)
        html_content = template.render(**environment)
        
        message.add_alternative(html_content, subtype="html")

        # SMTP Connection
        # DonWeb typically uses SSL on 465 or STARTTLS on 587. 
        # Using SSL (SMTP_SSL) for port 465 is standard.
        use_tls = settings.SMTP_PORT == 465

        await aiosmtplib.send(
            message,
            hostname=settings.SMTP_HOST,
            port=settings.SMTP_PORT,
            username=settings.SMTP_USER,
            password=settings.SMTP_PASSWORD,
            use_tls=use_tls,
            start_tls=not use_tls,
        )
        
        logger.info(f"Email sent to {email_to}: {subject}")

    except Exception as e:
        logger.error(f"Failed to send email to {email_to}: {e}")
        # In production we might want to re-raise or handle gracefully depending on importance
