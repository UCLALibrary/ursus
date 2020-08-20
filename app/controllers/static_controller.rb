# frozen_string_literal: true
class StaticController < ApplicationController
  def version; end

  # Ursus static pages
  def ursus_contact
    head :forbidden if Flipflop.sinai?
  end

  def ursus_about
    head :forbidden if Flipflop.sinai?
  end

  def ursus_copyright
    head :forbidden if Flipflop.sinai?
  end

  def ursus_privacy
    head :forbidden if Flipflop.sinai?
  end

  # Sinai static pages
  def sinai_terms_of_use
    head :forbidden unless Flipflop.sinai?
  end

  def sinai_contact
    head :forbidden unless Flipflop.sinai?
  end

  def sinai_about
    head :forbidden unless Flipflop.sinai?
  end

  def sinai_manuscript_descriptions
    head :forbidden unless Flipflop.sinai?
  end
end
