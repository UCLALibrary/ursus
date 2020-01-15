class CreateSinaiTokens < ActiveRecord::Migration[5.1]
    def change
        drop_table :sinai_tokens
        create_table :sinai_tokens do |t|
        t.string :sinai_token
  
        t.timestamps
      end
    end
  end
  