require 'rails_helper'

RSpec.describe "logins/show", type: :view do
  before(:each) do
    @login = assign(:login, Login.create!(
      :token => "Token"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Token/)
  end
end
