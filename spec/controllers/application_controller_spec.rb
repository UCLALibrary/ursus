# frozen_string_literal: true
require 'rails_helper'

RSpec.describe ApplicationController, type: :controller do
  let(:controller) { described_class.new }

  before do
    allow(Flipflop).to receive(:sinai?).and_return(true)
    allow(controller).to receive(:redirect_target).and_return('/redirect_target')
    allow(controller).to receive(:cookies).and_return(requested_path: '/requested_path')
    allow(controller).to receive(:login_path).and_return('/test_login')
    allow(controller).to receive(:redirect_to)
    allow(controller).to receive(:request).and_return(instance_double('ActionDispatch::Request', path: '/'))
    allow(controller).to receive(:set_auth_cookies)
    allow(controller).to receive(:sinai_authenticated?).and_return(false)
    allow(controller).to receive(:version_path).and_return('/test_version')
    allow(ENV).to receive(:[]).and_call_original
    allow(ENV).to receive(:[]).with('SINAI_ID_BYPASS').and_return(nil)
  end

  describe '#display_banner?' do
    context 'when banner cookie is set' do
      before do
        allow(controller).to receive(:banner_cookie?).and_return(true)
      end

      it 'sets @beta_banner_display_option to \'none\'' do
        controller.display_banner?
        expect(controller.instance_variable_get('@beta_banner_display_option')).to eq 'none'
      end
    end

    context 'when banner cookie is not set' do
      before do
        allow(controller).to receive(:banner_cookie?).and_return(false)
        allow(controller).to receive(:set_banner_cookie)
      end

      it 'sets @beta_banner_display_option to \'block\'' do
        controller.display_banner?
        expect(controller.instance_variable_get('@beta_banner_display_option')).to eq 'block'
      end

      it 'sets the banner cookie' do
        controller.display_banner?
        expect(controller).to have_received(:set_banner_cookie)
      end
    end
  end

  describe '#sinai_authn_check' do
    before do
     allow(controller).to receive(:ucla_token?).and_return(true)
    end
    context 'if ucla token is set in URL parameters' do
      it 'calls set_auth_cookies' do
        controller.sinai_authn_check
        expect(controller).to have_received(:set_auth_cookies)
      end

      it 'redirects to requested path' do
        controller.sinai_authn_check
        expect(controller).to have_received(:redirect_to).with('/requested_path')
      end
    end

    context 'if ucla token is not set' do
      before do
        allow(controller).to receive(:ucla_token?).and_return(false)
      end
      it 'redirects to requested path' do
        controller.sinai_authn_check
        expect(controller).to have_received(:redirect_to).with('/redirect_target')
      end
    end

    context 'if ENV[\'SINAI_ID_BYPASS\'] is true' do
      before do
        allow(ENV).to receive(:[]).and_call_original
        allow(ENV).to receive(:[]).with('SINAI_ID_BYPASS').and_return(true)
      end
      it 'returns true sinai_authn_check' do
        expect(controller.sinai_authn_check).to be true
      end
    end

    context 'if the \'sinai\' feature flag is off' do
      before do
        allow(Flipflop).to receive(:sinai?).and_return(false)
      end
      it 'returns Ursus and not Callisto' do
        expect(controller.sinai_authn_check).to be true
      end
    end

    context 'if the requested path is login_path' do
      before do
        allow(controller).to receive(:request).and_return(instance_double('ActionDispatch::Request', path: controller.login_path))
      end
      it 'allows Rails to continue' do
        expect(controller.sinai_authn_check).to be true
      end
    end

    context 'if the requested path is version_path' do
      before do
        allow(controller).to receive(:request).and_return(instance_double('ActionDispatch::Request', path: controller.version_path))
      end
      it 'allows Rails to continue' do
        expect(controller.sinai_authn_check).to be true
      end
    end

    context 'if we are already authenticated' do
      before do
        allow(controller).to receive(:sinai_authenticated?).and_return(true)
      end
      it 'allows Rails to continue' do
        expect(controller.sinai_authn_check).to be true
      end
    end
  end

  describe "#ucla_token" do
    context "querystring containing a param named token and, if so, was it previously written to the database" do
      let(:request_fullpath) { double('request', path: '/some-path') }
      before do
        params = ActionController::Parameters.new(token: '12345')
        allow(SinaiToken).to receive(:find_by)
        allow(controller).to receive(:params).and_return(params)
        allow(request).to receive(:fullpath).and_return('/some-path?token=')
      end

      it "has a token and is written to the database " do
        controller.ucla_token?
        expect(SinaiToken).to have_received(:find_by).with(sinai_token: params[:token] )
        expect(controller.ucla_token?).to be true
      end  

    end
    # context "# does the request have a querystring containing the character "?token=" and, if so, extract the token"
    # context "is the extracted token in the database and did the user pass through the login page?" 

  end  
end
