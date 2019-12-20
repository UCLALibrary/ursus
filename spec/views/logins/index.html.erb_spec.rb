require 'rails_helper'

RSpec.describe "logins/index", type: :view do
  before(:each) do
    assign(:logins, [
      Login.create!(
        :token => "Token"
      ),
      Login.create!(
        :token => "Token"
      )
    ])
  end

  it "renders a list of logins" do
    render
    assert_select "tr>td", :text => "Token".to_s, :count => 2
  end
end
