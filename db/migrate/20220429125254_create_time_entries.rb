class CreateTimeEntries < ActiveRecord::Migration[7.0]
  def change
    create_table :time_entries do |t|
      t.string :description
      t.datetime :started_at, null: false
      t.datetime :ended_at, null: false
      t.interval :lasted_for, null: false
      t.references :user, null: false, foreign_key: true

      t.check_constraint 'started_at <= ended_at', name: 'start_before_end_check'
      t.check_constraint '(started_at + lasted_for) = ended_at', name: 'started_plus_lasted_equals_ended_check'

      t.timestamps
    end
  end
end
