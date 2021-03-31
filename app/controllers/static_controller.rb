# frozen_string_literal: true
class StaticController < ApplicationController
  def version; end

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
end
