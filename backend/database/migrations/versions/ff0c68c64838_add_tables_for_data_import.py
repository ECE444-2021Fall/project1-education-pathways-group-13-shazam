"""add tables for data import

Revision ID: ff0c68c64838
Revises: 8f60baf2f1b8
Create Date: 2021-11-13 16:54:27.499593

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ff0c68c64838'
down_revision = '8f60baf2f1b8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('course',
    sa.Column('code', sa.String(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('level', sa.Integer(), nullable=True),
    sa.Column('division', sa.String(), nullable=True),
    sa.Column('department', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('campus', sa.String(), nullable=True),
    sa.Column('utsc_breadth', sa.String(), nullable=True),
    sa.Column('as_breadth', sa.String(), nullable=True),
    sa.Column('as_distribution', sa.String(), nullable=True),
    sa.Column('apsc_electives', sa.String(), nullable=True),
    sa.Column('utm_distribution', sa.String(), nullable=True),
    sa.Column('fase_available', sa.Boolean(), nullable=True),
    sa.Column('maybe_restricted', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('code')
    )
    op.create_table('corequisite',
    sa.Column('course', sa.String(), nullable=False),
    sa.Column('coreq', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['coreq'], ['course.code'], ),
    sa.ForeignKeyConstraint(['course'], ['course.code'], ),
    sa.PrimaryKeyConstraint('course', 'coreq')
    )
    op.create_table('exclusion',
    sa.Column('course', sa.String(), nullable=False),
    sa.Column('exclusion', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['course'], ['course.code'], ),
    sa.ForeignKeyConstraint(['exclusion'], ['course.code'], ),
    sa.PrimaryKeyConstraint('course', 'exclusion')
    )
    op.create_table('major_outcome',
    sa.Column('course', sa.String(), nullable=False),
    sa.Column('major', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['course'], ['course.code'], ),
    sa.PrimaryKeyConstraint('course', 'major')
    )
    op.create_table('minor_outcome',
    sa.Column('course', sa.String(), nullable=False),
    sa.Column('minor', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['course'], ['course.code'], ),
    sa.PrimaryKeyConstraint('course', 'minor')
    )
    op.create_table('offering',
    sa.Column('course', sa.String(), nullable=False),
    sa.Column('term', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['course'], ['course.code'], ),
    sa.PrimaryKeyConstraint('course', 'term')
    )
    op.create_table('preparation',
    sa.Column('course', sa.String(), nullable=False),
    sa.Column('recommended_preparation', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['course'], ['course.code'], ),
    sa.ForeignKeyConstraint(['recommended_preparation'], ['course.code'], ),
    sa.PrimaryKeyConstraint('course', 'recommended_preparation')
    )
    op.create_table('prerequisite',
    sa.Column('course', sa.String(), nullable=False),
    sa.Column('prereq', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['course'], ['course.code'], ),
    sa.ForeignKeyConstraint(['prereq'], ['course.code'], ),
    sa.PrimaryKeyConstraint('course', 'prereq')
    )
    op.create_table('smart_prerequisite',
    sa.Column('course', sa.String(), nullable=False),
    sa.Column('prereq', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['course'], ['course.code'], ),
    sa.ForeignKeyConstraint(['prereq'], ['course.code'], ),
    sa.PrimaryKeyConstraint('course', 'prereq')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('smart_prerequisite')
    op.drop_table('prerequisite')
    op.drop_table('preparation')
    op.drop_table('offering')
    op.drop_table('minor_outcome')
    op.drop_table('major_outcome')
    op.drop_table('exclusion')
    op.drop_table('corequisite')
    op.drop_table('course')
    # ### end Alembic commands ###