"""add table for user cart

Revision ID: 4d3c66cf3600
Revises: d62c258b50a7
Create Date: 2021-11-17 19:37:33.142377

"""
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "4d3c66cf3600"
down_revision = "d62c258b50a7"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "cart",
        sa.Column("user", sa.String(), nullable=False),
        sa.Column("course", sa.String(), nullable=False),
        sa.ForeignKeyConstraint(
            ["course"],
            ["course.code"],
        ),
        sa.ForeignKeyConstraint(
            ["user"],
            ["user.email"],
        ),
        sa.PrimaryKeyConstraint("user", "course"),
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("cart")
    # ### end Alembic commands ###
