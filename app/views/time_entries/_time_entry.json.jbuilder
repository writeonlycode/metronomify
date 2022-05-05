json.extract! time_entry, :id, :description, :started_at, :ended_at
json.lasted_for time_entry.lasted_for.iso8601
json.extract! time_entry, :user_id, :created_at, :updated_at
json.url time_entry_url(time_entry, format: :json)
