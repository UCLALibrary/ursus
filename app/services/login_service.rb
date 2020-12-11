# frozen_string_literal: true

class LoginService
  def create_token
    token = SecureRandom.uuid
    login = SinaiToken.create(sinai_token: token)
    login.sinai_token
  end
end
