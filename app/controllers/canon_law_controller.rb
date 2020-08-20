# frozen_string_literal: true

class CanonLawController < ApplicationController
  def index
    head :forbidden if Flipflop.sinai?
  end

  def introduction
    head :forbidden if Flipflop.sinai?
  end

  def table_of_contents
    head :forbidden if Flipflop.sinai?
  end

  def margarita
    head :forbidden if Flipflop.sinai?
  end

  def materiae
    head :forbidden if Flipflop.sinai?
  end
end
