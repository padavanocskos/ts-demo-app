# frozen_string_literal: true

# General contacts controller
module Api
  module V1
    class ContactsController < ApiController
      def index
        @q = Contact.ransack(params[:q])
        @contacts = @q.result.page(params[:page].to_i + 1).per(params[:per])
        render json: { rows: @contacts, totalRows: @contacts.total_count }
      end

      def create
        @contact = Contact.new(contact_params)

        if @contact.save
          render json: @contact, status: :created
        else
          render json: @contact.errors, status: :unprocessable_entity
        end
      end

      private

      def contact_params
        puts 'alma'
        params.require(:contact).permit(:first_name, :last_name, :middle_name, :phone1, :phone2, :mobile1, :mobile2) # Add the permitted attributes here
      end
    end
  end
end
