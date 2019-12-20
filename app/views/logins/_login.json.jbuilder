json.extract! login, :id, :token, :created_at, :updated_at
json.url login_url(login, format: :json)
