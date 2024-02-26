# frozen_string_literal: true

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'localhost:8000'
    resource '/api/v1/contacts', headers: :any, methods: [:get, :post, :patch, :put]
  end
end

# for test cors
# curl -I -X OPTIONS \
#   -H "Origin: http://172.17.0.1:8000" \
#   -H 'Access-Control-Request-Method: POST' \
#   "http://localhost:3000/api/v1/contacts" 2>&1 | grep -i 'Access-Control-Allow-Origin'