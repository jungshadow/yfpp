import json, re, logging, random
from django.conf import settings as ds
from django.shortcuts import get_object_or_404, render_to_response
from django.http import HttpResponseRedirect, HttpResponse
from django.core.urlresolvers import reverse
from django.template import RequestContext
from random import choice
from urllib import urlencode
from urllib2 import urlopen
from operator import itemgetter
from pprint import pprint
import requests

#from models import Greeting

def hit_api(method, **kwargs):
    """Queries the VIP Google API with the given address.

    Positional arguments:
    method -- A string of the particular API call
    
    Keyword arguments:
    **kwargs -- a dictionary of additional POST arguments
    """


    request = urllib2.Request(url, None, headers)

    if kwargs:
        request.add_data(urllib.urlencode(kwargs))

    try:
        response = json.load(urllib2.urlopen(request, None, 3))
        return response
    except urllib2.URLError as e:
        return (address, { 'locations': '', 'error': e, 'status': 'API_ERROR' },)
    except Exception as e:
        # Something more low level
        return (address, { 'locations': '', 'error': e, 'status': 'API_ERROR' },)

def fuck_addresses(addresses):
    fucked_addresses = []

    for address in addresses:
        print address
        if 'locationName' in address['address'] and len(address['address']['locationName']) > 0:
            head,sep,tail = address['address']['locationName'].partition(' ')

            if tail=='':
                address['address']['locationName'] = ' '.join(['fucking',head]).title()
            else:
                address['address']['locationName'] = ' '.join([head,'fucking',tail]).title()

        else:
            address['address']['locationName'] = 'Some Fucking Building'.upper()
        
        #address['directions_end'] = directionalize(address['address'])
        fucked_addresses.append(address['address'])

    return fucked_addresses

def commence_douchebaggery(contests):
    fucked_candidates = []
    middle_names = [
        "polliwog", 
        "foot",
        "antidisestablishmentarianism",
        "wart",
        "pickle",
        "booger",
        "bull poopy",
        "buswaggled",
        "wingodingdingo",
        "pocket",
        "nemo",
        "dish",
        "osmosis",
        "lamp",
        "klecko",
        "indago",
        "Belguim Waffles",
        "Wrigley",
        "McCloud",
        "Juicy Fruit",
        "Moose"
        "Melonballer",
        "Calking Gun",
        "Doily",
        "Heart Attack",
        "Contusion",
        "String Bean",
        "Wild Boar",
        "Pants",
        "Kumquat"]

    for contest in contests:
        print contest
        fucked_candidates.append(contest)

    return fucked_candidates

def call_api(address):
    """Queries the VIP Google API with the given address.

    Positional arguments:
    address -- A registered address
    """
    CIVIC_API_BASE_URL = "https://www.googleapis.com/civicinfo/us_v1/voterinfo/{election_id}/lookup?key={key}"

    election_id = 4000
    headers = {
        "content-type": "application/json",
#        "Accept-Encoding": "gzip",
#        "User-Agent": "YFPP (gzip)",
    }

    request_url = CIVIC_API_BASE_URL.format(
        election_id=election_id, key=ds.YFPP_CIVIC_API_KEY)

    return json.loads(
        requests.post(
            request_url,
            data=json.dumps(
                {'address':address}),
            headers=headers).text)

def get_fucking_election_shit(reg_address):
    # get api call result
    result = call_api(address=reg_address)
    addresses = []

    # figure out if there's anything of use
    if result is not None:
        if result['status']=="success" :
            return (result.get('pollingLocations',[]),
            result.get('contests', []))

    return ([], [])

def fucking_check(request):
    if not request.POST['address']:
        return HttpResponseRedirect(reverse('home'))
    else:
        addresses, contests = get_fucking_election_shit(request.POST['address'])
        request.session['addresses'] = addresses
        request.session['contests'] = contests
        request.session['original_address'] = request.POST['address']

    # Always return an HttpResponseRedirect after successfully dealing
    # with POST data. This prevents data from being posted twice if a
    # user hits the Back button.
    return HttpResponseRedirect(reverse('results'))

def results(request):
    addresses = request.session['addresses']
    original_address = request.session['original_address']

    if len(addresses) > 0:
        #directions_urls = directionalize(addresses)
        addresses = fuck_addresses(addresses)

    return render_to_response('yfpp/results.html', {
            'addresses': addresses,
            'greeting': '',#get_greeting(),
            'original_address': original_address,
    })
