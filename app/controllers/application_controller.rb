class ApplicationController < ActionController::Base
  # skip_before_action :verify_authenticity_token
  # before_action :show_csrf_token_info

  def show_csrf_token_info

    puts 'params[request_forgery_protection_token]'
    puts params[request_forgery_protection_token]

    puts 'request.x_csrf_token:'
    request_authenticity_token = request.x_csrf_token
    puts request_authenticity_token

    puts 'masked_token:'
    masked_token = decode_csrf_token(form_authenticity_token)
    puts masked_token

    puts 'unmasked_token:'
    csrf_token = unmask_token(masked_token)
    puts csrf_token

    puts 'session[:_csrf_token]:'
    puts session[:_csrf_token]

    # puts "valid?"
    # puts compare_with_global_token(csrf_token, session)
    #
    # puts 'valid_authenticity_token?'
    # puts valid_authenticity_token?(session, 'Sr2UueGdpHINBVFpGuUSZnBMYTA1_oYn1USIfv9zM2clLAU9ZjabX_IXBeErN6hheJjxwEMKLync0voiT0Od8w')

  end
end
