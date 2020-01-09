class CreateSinaiTokens < ActiveRecord::Migration[5.1]
  def change
    if !table_exists?(:sinai_tokens)
      create_table :sinai_tokens do |t|
        t.string :sinai_token
        t.timestamps
      end
    end
  end
end
