# frozen_string_literal: true
# Preview all emails at http://localhost:3000/rails/mailers/feedback_mailer

class FeedbackMailerPreview < ActionMailer::Preview
  def feedback_mail_preview
    FeedbackMailer.feedback_form_email('Andrew Wallace', 'abc@email.com', 'a;ksdu ajskgd aklsjhgdh algals dja; alskj lkjd lakjs kdglf kjd')
  end
end
