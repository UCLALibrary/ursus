require 'rails_helper'

RSpec.describe "logins/new", type: :view do
  before(:each) do
    assign(:login, Login.new(
      :token => "MyString"
    ))
  end

  it "renders new login form" do
    render

    assert_select "form[action=?][method=?]", logins_path, "post" do

      assert_select "input[name=?]", "login[token]"
    end
  end
end
