# frozen_string_literal: true
require "rails_helper"

RSpec.describe FeedbackMailer, type: :mailer do
  describe '#feedback_form_email' do
    let(:email) { 'sender@e.mail' }
    let(:mail_message) { described_class.feedback_form_email(name, email, message).message }
    let(:message) { 'messy messy message' }
    let(:name) { 'als;jdhf' }
    let(:to_email) { 'destination@mail.com' }

    before do
      allow(ENV).to receive(:[]).and_call_original
      allow(ENV).to receive(:[]).with('EMAIL_TO_ADDRESS').and_return(to_email)
    end

    it 'creates a Mail::Message object' do
      expect(mail_message).to be_a Mail::Message
    end

    it 'sends to the right address' do
      expect(mail_message.to).to contain_exactly(to_email)
    end

    it 'sends from the right address' do
      expect(mail_message.from).to contain_exactly(email)
    end

    it 'includes the submitter\'s name' do
      expect(mail_message.body).to include(name)
    end

    it 'includes the submitter\'s email' do
      expect(mail_message.body).to include(email)
    end

    it 'includes the submitted message' do
      expect(mail_message.body).to include(message)
    end
  end
end
