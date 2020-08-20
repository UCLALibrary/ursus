# frozen_string_literal: true

class CanonLawController < ApplicationController
  def index
    return head :forbidden unless !Flipflop.sinai?
  end

  def introduction
    return head :forbidden unless !Flipflop.sinai?
  end

  def table_of_contents
    return head :forbidden unless !Flipflop.sinai?
  end

  def margarita
    return head :forbidden unless !Flipflop.sinai?
  end

  def materiae
    return head :forbidden unless !Flipflop.sinai?
  end
end
