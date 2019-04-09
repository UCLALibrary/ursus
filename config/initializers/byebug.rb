# frozen_string_literal: true

if Rails.env.development?
  require 'byebug/core'
  Byebug.wait_connection = true
  Byebug.start_server 'localhost', '8989'
end
