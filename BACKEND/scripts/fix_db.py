import sqlite3
import os

def fix_user_table():
    db_path = os.environ.get("DATABASE_URL", "sqlite:////data/vicking.db").replace("sqlite+aiosqlite:///", "").replace("sqlite:///", "")
    
    # Check if absolute or relative
    if not db_path.startswith("/"):
        db_path = os.path.join(os.getcwd(), db_path)

    print(f"Fixing database at {db_path}...")
    
    if not os.path.exists(db_path):
        print("Database file not found!")
        return

    conn = sqlite3.connect(db_path)
    cur = conn.cursor()

    columns_to_add = [
        ("role", "VARCHAR DEFAULT 'usuario_nacional'"),
        ("newsletter_subscribed", "BOOLEAN DEFAULT 0"),
        ("name", "VARCHAR"),
        ("last_name", "VARCHAR"),
        ("company", "VARCHAR"),
        ("phone", "VARCHAR"),
        ("city", "VARCHAR"),
        ("province", "VARCHAR"),
        ("country", "VARCHAR"),
        ("rubro", "VARCHAR"),
        ("work_area", "VARCHAR"),
    ]
    
    for col, dtype in columns_to_add:
        try:
            cur.execute(f"ALTER TABLE user ADD COLUMN {col} {dtype}")
            print(f"Successfully added column: {col}")
        except sqlite3.OperationalError as e:
            if "duplicate column name" in str(e).lower():
                print(f"Column {col} already exists, skipping...")
            else:
                print(f"Error adding {col}: {e}")
                
    conn.commit()
    conn.close()
    print("Database fix completed!")

if __name__ == "__main__":
    fix_user_table()
