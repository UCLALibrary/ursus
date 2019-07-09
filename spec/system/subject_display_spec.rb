
# frozen_string_literal: true
require 'rails_helper'

RSpec.describe 'The subject field of the item display view', :clean, type: :system do
  before do
    solr = Blacklight.default_index.connection
    solr.add(work_attributes)
    solr.commit
  end

  let(:work_attributes) do
    {
      id: '123_subject_display',
      subject_tesim: ['subject1', 'subject2', 'subject3'],
      read_access_group_ssim: ["public"],
      has_model_ssim: ['Work']
    }
  end

  it 'lists each subject on its own line, as a link to a search for that subject' do
    visit('/catalog/123_subject_display')

    page.within('dd.blacklight-subject_tesim') do
      expect(all(:css, 'br').length).to eq 2
      expect(page).to have_link('subject1', href: '/catalog?f%5Bsubject_sim%5D%5B%5D=subject1')
      expect(page).to have_link('subject2', href: '/catalog?f%5Bsubject_sim%5D%5B%5D=subject2')
      expect(page).to have_link('subject3', href: '/catalog?f%5Bsubject_sim%5D%5B%5D=subject3')
    end
  end
end
