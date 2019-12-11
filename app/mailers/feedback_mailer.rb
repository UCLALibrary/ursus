# frozen_string_literal: true

class FeedbackMailer < ApplicationMailer
  default from: 'sourcefilter@gmail.com'

  def feedback_form_email(name, email, message)
    @name = name
    @email = email
    @message = message
    mail(to: ENV['EMAIL_TO_ADDRESS'],
         from: @email,
         subject: 'Feedback from UCLA Digital Library website')
  end
end
