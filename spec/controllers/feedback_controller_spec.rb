# frozen_string_literal: true
require 'rails_helper'

RSpec.describe FeedbackController, type: :controller do
  describe "POST #email_feedback" do
    let(:params) { { name: 'name', email: 'email', message: 'message' } }
    let(:mail_message) { instance_double('Mail::Message', deliver: true) }

    before do
      allow(FeedbackMailer).to receive(:feedback_form_email).with(params[:name], params[:email], params[:message]).and_return(mail_message)
      post(:email_feedback, params: params)
    end

    it 'sends an email' do
      expect(mail_message).to have_received(:deliver)
    end

    it 'flashes a success message' do
      expect(flash[:success]).to eq 'Your message has been sent to Digital Library Program staff. Thank you for your feedback!'
    end

    it 'redirects back to the contact page' do
      expect(response).to redirect_to('/contact')
    end
  end
end
