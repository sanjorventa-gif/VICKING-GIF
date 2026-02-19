"""Update templates schema

Revision ID: d123456789ab
Revises: cbc2e15fddc2
Create Date: 2026-02-06 14:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = 'd123456789ab'
down_revision: Union[str, None] = '1150aeaada0c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    conn = op.get_bind()
    from sqlalchemy.engine.reflection import Inspector
    inspector = Inspector.from_engine(conn)
    
    # 1. Cleanup leftover tmp table from failed previous runs
    if '_alembic_tmp_templates' in inspector.get_table_names():
        op.drop_table('_alembic_tmp_templates')

    # 2. Drop the index on 'category' explicitly if it exists, to prevent batch_alter from tripping over it
    # This addresses "no such column: category" during index recreation in batch mode
    for idx in inspector.get_indexes('templates'):
        if 'category' in idx['column_names']:
            op.drop_index(idx['name'], table_name='templates')

    columns = [c['name'] for c in inspector.get_columns('templates')]

    with op.batch_alter_table('templates', schema=None) as batch_op:
        if 'slug' not in columns:
            batch_op.add_column(sa.Column('slug', sa.String(length=100), nullable=True))
            batch_op.create_index(batch_op.f('ix_templates_slug'), ['slug'], unique=True)
            
        if 'categories' not in columns:
            batch_op.add_column(sa.Column('categories', sa.JSON(), nullable=True))
            
        if 'show_on_home' not in columns:
            batch_op.add_column(sa.Column('show_on_home', sa.Boolean(), nullable=True))
            
        if 'category' in columns:
            batch_op.drop_column('category')


def downgrade() -> None:
    with op.batch_alter_table('templates', schema=None) as batch_op:
        batch_op.add_column(sa.Column('category', sa.VARCHAR(length=50), nullable=True, server_default=sa.text("'GENERAL'")))
        batch_op.drop_index(batch_op.f('ix_templates_slug'))
        batch_op.drop_column('show_on_home')
        batch_op.drop_column('categories')
        batch_op.drop_column('slug')
