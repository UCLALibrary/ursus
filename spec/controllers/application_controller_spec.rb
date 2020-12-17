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
    allow(controller).to receive(:solr_document_path).with('ark:').and_return('/catalog/ark:')
    allow(controller).to receive(:params).and_return(id: nil)
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
      it 'returns nil' do
        # controller.sinai_authn_check
        expect(controller.sinai_authn_check).to be_nil # have_received(:redirect_to).with('/redirect_target')
      end
    end

    context 'if ENV[\'SINAI_ID_BYPASS\'] is true' do
      before do
        allow(ENV).to receive(:[]).and_call_original # default
        allow(ENV).to receive(:[]).with('SINAI_ID_BYPASS').and_return(true) # specific
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

    context 'if the requested path is solr_document_path' do
      before do
        allow(controller).to receive(:params).and_return(id: 'ark:')
        allow(controller).to receive(:sinai_authenticated?).and_return(false)
        allow(controller).to receive(:request).and_return(instance_double('ActionDispatch::Request', path: controller.solr_document_path('ark:')))
      end
      it 'redirects to requested path' do
        controller.sinai_authn_check
        expect(controller).to have_received(:redirect_to).with('/redirect_target')
      end
    end
  end

  describe "#ucla_token" do
    let(:request_fullpath) { instance_double('request', path: '/some-path', fullpath: '/catalog/ark:/21198/z1b0085j?topic=edication?token=408626bb-87a0-46cb-a592-8ece576a745f') }
    let(:foo) { instance_double("SinaiToken", sinai_token: "12345") }

    before do
      allow(request).to receive(:fullpath).and_return('/some-path?token=')
    end

    context "the querystring contains a param named: 'token' and it is in the database" do
      before do
        params = ActionController::Parameters.new(token: '12345')
        allow(controller).to receive(:params).and_return(params)
        allow(SinaiToken).to receive(:find_by).and_return(nil) # default
        allow(SinaiToken).to receive(:find_by).with(sinai_token: params[:token]).and_return(foo) # specific case
      end
      it "returns true" do
        expect(controller.ucla_token?).to be true
      end
    end

    context "token is included in the query string but didn't get parsed because of emel bug" do
      before do
        allow(controller).to receive(:request).and_return(request_fullpath)
        params = ActionController::Parameters.new(silly: '12345')
        allow(controller).to receive(:params).and_return(params)
        allow(SinaiToken).to receive(:find_by).with(sinai_token: params[:token]).and_return(foo)
      end
      context "token is found in the database" do
        before do
          allow(SinaiToken).to receive(:find_by).with(sinai_token: '408626bb-87a0-46cb-a592-8ece576a745f').and_return(foo)
        end
        it "returns true" do
          expect(controller.ucla_token?).to be true
        end
      end
      context "token is NOT found in the database" do
        before do
          allow(SinaiToken).to receive(:find_by).with(sinai_token: '408626bb-87a0-46cb-a592-8ece576a745f').and_return(nil)
        end
        it "returns false" do
          expect(controller.ucla_token?).to be false
        end
      end
    end

    context "token is not included" do
      let(:request_no_token) { instance_double('request', path: '/some-path', fullpath: '/catalog/ark:/21198/z1b0085j?topic=edication?lamb=408626bb-87a0-46cb-a592-8ece576a745f') }
      before do
        allow(controller).to receive(:request).and_return(request_no_token)
        params = ActionController::Parameters.new(silly: '12345')
        allow(controller).to receive(:params).and_return(params)
        allow(SinaiToken).to receive(:find_by).with(sinai_token: params[:token]).and_return(foo)
      end
      it 'returns false' do
        expect(controller.ucla_token?).to be false
      end
    end
  end # describe ucla_token?

  describe 'set_auth_cookies' do
    context 'creates the sinai_authenticated cookie' do
      let(:cookies) { {} }
      before do
        allow(controller).to receive(:cookies).and_return(cookies)
        allow(controller).to receive(:create_encrypted_string).and_return('mock_encrypted_string')
        allow(ENV).to receive(:[]).and_call_original
        allow(ENV).to receive(:[]).with('CIPHER_KEY').and_return('Thispasswordisreallyhardtoguess?')
        allow(ENV).to receive(:[]).with('DOMAIN').and_return('ucla.edu')
        allow(controller).to receive(:set_auth_cookies).and_call_original
        allow(controller).to receive(:cipher_iv).and_return('mock_cipher_iv')
      end

      it 'sets the sinai_authenticated cookie value' do
        controller.set_auth_cookies
        expect(cookies[:sinai_authenticated][:value]).to eq('mock_encrypted_string'.unpack('H*')[0].upcase)
      end

      it 'sets an expiration date for the sinai_authenticated cookie' do
        controller.set_auth_cookies
        expect(cookies[:sinai_authenticated][:expires]).to be_kind_of(Time)
      end

      it 'sets the initialization_vector cookie value' do
        controller.set_auth_cookies
        expect(cookies[:initialization_vector][:value]).to eq('mock_cipher_iv'.unpack('H*')[0].upcase)
      end

      it 'sets an expiration date for the initialization_vector cookie' do
        controller.set_auth_cookies
        expect(cookies[:initialization_vector][:expires]).to be_kind_of(Time)
      end
    end
  end
end
