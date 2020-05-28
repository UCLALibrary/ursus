# frozen_string_literal: true
class StaticController < ApplicationController
  def version; end

  def contact; end

  # Ursus static pages
  def ursus_about; end

  def ursus_copyright; end

  def ursus_privacy; end

  # Sinai static pages
  def sinai_terms_of_use; end
end
