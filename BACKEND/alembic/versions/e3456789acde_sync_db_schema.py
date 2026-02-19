"""Sync DB schema with models

Revision ID: e3456789acde
Revises: d123456789ab
Create Date: 2026-02-19 18:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.engine.reflection import Inspector


# revision identifiers, used by Alembic.
revision: str = 'e3456789acde'
down_revision: Union[str, None] = 'd123456789ab'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    conn = op.get_bind()
    inspector = Inspector.from_engine(conn)
    tables = inspector.get_table_names()

    # 1. Handle User table (rename 'users' -> 'user' and add columns)
    if 'users' in tables and 'user' not in tables:
        op.rename_table('users', 'user')
    
    # Reload tables after rename
    tables = inspector.get_table_names()
    
    if 'user' in tables:
        # Check columns in 'user'
        columns = [c['name'] for c in inspector.get_columns('user')]
        
        with op.batch_alter_table('user', schema=None) as batch_op:
            if 'role' not in columns:
                batch_op.add_column(sa.Column('role', sa.String(), nullable=True, server_default='usuario_nacional'))
            if 'newsletter_subscribed' not in columns:
                batch_op.add_column(sa.Column('newsletter_subscribed', sa.Boolean(), nullable=True, server_default='0'))
            if 'name' not in columns:
                batch_op.add_column(sa.Column('name', sa.String(), nullable=True))
            if 'last_name' not in columns:
                batch_op.add_column(sa.Column('last_name', sa.String(), nullable=True))
            if 'company' not in columns:
                batch_op.add_column(sa.Column('company', sa.String(), nullable=True))
            if 'phone' not in columns:
                batch_op.add_column(sa.Column('phone', sa.String(), nullable=True))
            if 'city' not in columns:
                batch_op.add_column(sa.Column('city', sa.String(), nullable=True))
            if 'province' not in columns:
                batch_op.add_column(sa.Column('province', sa.String(), nullable=True))
            if 'country' not in columns:
                batch_op.add_column(sa.Column('country', sa.String(), nullable=True))
            if 'rubro' not in columns:
                batch_op.add_column(sa.Column('rubro', sa.String(), nullable=True))
            if 'work_area' not in columns:
                batch_op.add_column(sa.Column('work_area', sa.String(), nullable=True))

    # 2. Create missing tables
    
    
    # Helper to check if index exists
    def index_exists(table_name, index_name):
        indexes = inspector.get_indexes(table_name)
        return any(idx['name'] == index_name for idx in indexes)

    if 'product' not in tables:
        op.create_table('product',
            sa.Column('id', sa.String(), primary_key=True, index=True),
            sa.Column('name', sa.String(), index=True),
            sa.Column('category', sa.String(), index=True),
            sa.Column('description', sa.Text()),
            sa.Column('image', sa.Text()),
            sa.Column('features', sa.JSON()),
            sa.Column('dimensions', sa.JSON()),
            sa.Column('temperature', sa.JSON()),
            sa.Column('technical_sheet', sa.Text(), nullable=True),
            sa.Column('order', sa.Integer(), default=0),
        )
    
    if 'product' in inspector.get_table_names(): # Re-check after potential creation
        if not index_exists('product', 'ix_product_id'): op.create_index(op.f('ix_product_id'), 'product', ['id'], unique=False)
        if not index_exists('product', 'ix_product_name'): op.create_index(op.f('ix_product_name'), 'product', ['name'], unique=False)
        if not index_exists('product', 'ix_product_category'): op.create_index(op.f('ix_product_category'), 'product', ['category'], unique=False)

    if 'carouselitem' not in tables:
        op.create_table('carouselitem',
            sa.Column('id', sa.Integer(), primary_key=True, index=True),
            sa.Column('title', sa.String(), index=True),
            sa.Column('subtitle', sa.String(), nullable=True),
            sa.Column('image', sa.String(), nullable=False),
            sa.Column('order', sa.Integer(), default=0),
            sa.Column('button_text', sa.String(), nullable=True),
            sa.Column('button_link', sa.String(), nullable=True),
            sa.Column('transition_effect', sa.String(), default="slide"),
            sa.Column('overlay_effect', sa.String(), default="grid"),
        )

    if 'carouselitem' in inspector.get_table_names():
        if not index_exists('carouselitem', 'ix_carouselitem_id'): op.create_index(op.f('ix_carouselitem_id'), 'carouselitem', ['id'], unique=False)
        if not index_exists('carouselitem', 'ix_carouselitem_title'): op.create_index(op.f('ix_carouselitem_title'), 'carouselitem', ['title'], unique=False)

    if 'history' not in tables:
        op.create_table('history',
            sa.Column('id', sa.Integer(), primary_key=True, index=True),
            sa.Column('year', sa.Integer(), index=True),
            sa.Column('title', sa.String(), index=True),
            sa.Column('description', sa.Text()),
            sa.Column('image', sa.String(), nullable=True),
            sa.Column('order', sa.Integer(), default=0),
        )

    if 'history' in inspector.get_table_names():
        if not index_exists('history', 'ix_history_id'): op.create_index(op.f('ix_history_id'), 'history', ['id'], unique=False)
        if not index_exists('history', 'ix_history_year'): op.create_index(op.f('ix_history_year'), 'history', ['year'], unique=False)
        if not index_exists('history', 'ix_history_title'): op.create_index(op.f('ix_history_title'), 'history', ['title'], unique=False)
        
    if 'news' not in tables:
        op.create_table('news',
            sa.Column('id', sa.Integer(), primary_key=True, index=True),
            sa.Column('title', sa.String(), index=True),
            sa.Column('date', sa.Date()),
            sa.Column('category', sa.String()),
            sa.Column('excerpt', sa.Text()),
            sa.Column('image', sa.String()),
            sa.Column('content', sa.Text(), nullable=True),
            sa.Column('slug', sa.String(), unique=True, index=True, nullable=True),
            sa.Column('allowed_roles', sa.JSON(), default=list),
        )

    if 'news' in inspector.get_table_names():
        if not index_exists('news', 'ix_news_id'): op.create_index(op.f('ix_news_id'), 'news', ['id'], unique=False)
        if not index_exists('news', 'ix_news_title'): op.create_index(op.f('ix_news_title'), 'news', ['title'], unique=False)
        if not index_exists('news', 'ix_news_slug'): op.create_index(op.f('ix_news_slug'), 'news', ['slug'], unique=True)

    if 'download' not in tables:
        op.create_table('download',
            sa.Column('id', sa.Integer(), primary_key=True, index=True),
            sa.Column('title', sa.String(), index=True),
            sa.Column('description', sa.String(), nullable=True),
            sa.Column('file_url', sa.Text(), nullable=False),
            sa.Column('category', sa.String(), index=True),
            sa.Column('language', sa.String(), index=True),
            sa.Column('allowed_roles', sa.JSON(), default=list),
            sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('(CURRENT_TIMESTAMP)')),
        )

    if 'download' in inspector.get_table_names():
        if not index_exists('download', 'ix_download_id'): op.create_index(op.f('ix_download_id'), 'download', ['id'], unique=False)
        if not index_exists('download', 'ix_download_title'): op.create_index(op.f('ix_download_title'), 'download', ['title'], unique=False)
        if not index_exists('download', 'ix_download_category'): op.create_index(op.f('ix_download_category'), 'download', ['category'], unique=False)
        if not index_exists('download', 'ix_download_language'): op.create_index(op.f('ix_download_language'), 'download', ['language'], unique=False)

    if 'service_requests' not in tables:
        op.create_table('service_requests',
            sa.Column('id', sa.Integer(), primary_key=True, index=True),
            sa.Column('name', sa.String(), index=True),
            sa.Column('email', sa.String(), index=True),
            sa.Column('company', sa.String()),
            sa.Column('last_name', sa.String()),
            sa.Column('phone', sa.String()),
            sa.Column('address', sa.String()),
            sa.Column('city', sa.String()),
            sa.Column('province', sa.String()),
            sa.Column('country', sa.String()),
            sa.Column('stove_model', sa.String()),
            sa.Column('serial_number', sa.String()),
            sa.Column('rubro', sa.String()),
            sa.Column('work_area', sa.String()),
            sa.Column('purchase_date', sa.String()),
            sa.Column('problem_description', sa.Text()),
            sa.Column('status', sa.String(), default="Pendiente"),
            sa.Column('user_id', sa.Integer(), sa.ForeignKey('user.id'), nullable=True),
            sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('(CURRENT_TIMESTAMP)')),
        )

    if 'service_requests' in inspector.get_table_names():
        if not index_exists('service_requests', 'ix_service_requests_id'): op.create_index(op.f('ix_service_requests_id'), 'service_requests', ['id'], unique=False)
        if not index_exists('service_requests', 'ix_service_requests_name'): op.create_index(op.f('ix_service_requests_name'), 'service_requests', ['name'], unique=False)
        if not index_exists('service_requests', 'ix_service_requests_email'): op.create_index(op.f('ix_service_requests_email'), 'service_requests', ['email'], unique=False)

    if 'warranty_registrations' not in tables:
        op.create_table('warranty_registrations',
            sa.Column('id', sa.Integer(), primary_key=True, index=True),
            sa.Column('name', sa.String(), index=True),
            sa.Column('last_name', sa.String()),
            sa.Column('company', sa.String()),
            sa.Column('email', sa.String(), index=True),
            sa.Column('phone', sa.String()),
            sa.Column('address', sa.String()),
            sa.Column('city', sa.String()),
            sa.Column('province', sa.String()),
            sa.Column('country', sa.String()),
            sa.Column('stove_model', sa.String()),
            sa.Column('rubro', sa.String()),
            sa.Column('work_area', sa.String()),
            sa.Column('serial_number', sa.String()),
            sa.Column('purchase_date', sa.String()),
            sa.Column('vendor', sa.String()),
            sa.Column('registration_type', sa.String(), default="standard"),
            sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('(CURRENT_TIMESTAMP)')),
        )

    if 'warranty_registrations' in inspector.get_table_names():
        if not index_exists('warranty_registrations', 'ix_warranty_registrations_id'): op.create_index(op.f('ix_warranty_registrations_id'), 'warranty_registrations', ['id'], unique=False)
        if not index_exists('warranty_registrations', 'ix_warranty_registrations_name'): op.create_index(op.f('ix_warranty_registrations_name'), 'warranty_registrations', ['name'], unique=False)
        if not index_exists('warranty_registrations', 'ix_warranty_registrations_email'): op.create_index(op.f('ix_warranty_registrations_email'), 'warranty_registrations', ['email'], unique=False)

    if 'faqs' not in tables:
        op.create_table('faqs',
            sa.Column('id', sa.Integer(), primary_key=True, index=True),
            sa.Column('question', sa.String(), index=True),
            sa.Column('answer', sa.String()),
            sa.Column('order', sa.Integer(), default=0),
            sa.Column('is_active', sa.Boolean(), default=True),
        )

    if 'faqs' in inspector.get_table_names():
        if not index_exists('faqs', 'ix_faqs_id'): op.create_index(op.f('ix_faqs_id'), 'faqs', ['id'], unique=False)
        if not index_exists('faqs', 'ix_faqs_question'): op.create_index(op.f('ix_faqs_question'), 'faqs', ['question'], unique=False)
        
    if 'newsletter' not in tables:
        op.create_table('newsletter',
            sa.Column('id', sa.Integer(), primary_key=True, index=True),
            sa.Column('email', sa.String(), unique=True, index=True, nullable=False),
            sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('(CURRENT_TIMESTAMP)')),
        )

    if 'newsletter' in inspector.get_table_names():
        if not index_exists('newsletter', 'ix_newsletter_id'): op.create_index(op.f('ix_newsletter_id'), 'newsletter', ['id'], unique=False)
        if not index_exists('newsletter', 'ix_newsletter_email'): op.create_index(op.f('ix_newsletter_email'), 'newsletter', ['email'], unique=True)


def downgrade() -> None:
    # Downgrade logic is complex due to conditional upgrades.
    # Generally, we would drop tables created and revert renamed tables.
    # But for now, we assume this is a forward-fix migration.
    pass
