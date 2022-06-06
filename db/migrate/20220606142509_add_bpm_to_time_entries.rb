class AddBpmToTimeEntries < ActiveRecord::Migration[7.0]
  def change
    add_column :time_entries, :bpm, :integer
  end
end
