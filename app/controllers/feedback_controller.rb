# frozen_string_literal: true

class FeedbackController < ApplicationController
  def email_feedback
    FeedbackMailer.feedback_form_email(params[:name], params[:email], params[:message]).deliver
    flash[:success] = 'Your message has been sent to Digital Library Program staff. Thank you for your feedback!'
    redirect_to '/contact'
  end
end
