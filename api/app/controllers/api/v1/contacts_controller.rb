# frozen_string_literal: true

# General contacts controller
module Api
  module V1
    class ContactsController < ApiController
      def index
        @q = Contact.ransack(params[:q])
        # debugger
        @contacts = @q.result.page(params[:page]).per(params[:per])
        render json: { rows: @contacts, totalRows: @contacts.total_count }
      end
    end
  end
end
