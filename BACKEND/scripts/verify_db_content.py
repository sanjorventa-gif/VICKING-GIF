import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from app.db.session import SessionLocal
from app.models.carousel import CarouselItem
from app.models.faq import Faq
from app.models.history import History

def check_db():
    db = SessionLocal()
    print("--- Checking Carousel ---")
    items = db.query(CarouselItem).all()
    for item in items:
        print(f"- {item.title}")

    print("\n--- Checking FAQs ---")
    faqs = db.query(Faq).all()
    for faq in faqs:
        print(f"- {faq.question}")

    print("\n--- Checking History ---")
    history_items = db.query(History).order_by(History.year.desc()).all()
    for item in history_items:
        print(f"- {item.year}: {item.title}")
    
    db.close()

if __name__ == "__main__":
    check_db()
