# frozen_string_literal: true
class StaticController < ApplicationController
  def version; end

  # Ursus static pages

  def ursus_contact
    return head :forbidden unless !Flipflop.sinai?
  end

  def ursus_about
    return head :forbidden unless !Flipflop.sinai?
  end

  def ursus_copyright
    return head :forbidden unless !Flipflop.sinai?
  end

  def ursus_privacy
    return head :forbidden unless !Flipflop.sinai?
  end

  # Sinai static pages
  def sinai_terms_of_use
    return head :forbidden unless Flipflop.sinai?
  end

  def sinai_contact
    return head :forbidden unless Flipflop.sinai?
  end

  def sinai_about
    return head :forbidden unless Flipflop.sinai?
  end

  def sinai_manuscript_descriptions
    return head :forbidden unless Flipflop.sinai?
  end
end
