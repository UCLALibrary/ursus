# frozen_string_literal: true

Rails.application.reloader.to_prepare do
  OAI::Provider::Base.register_format(OaiMods.instance)
end
