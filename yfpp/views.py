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
import urllib2

def fuck_addresses(addresses):
    fucked_addresses = []
    state = ""
    for address in addresses:

        if 'locationName' in address['address'] and len(address['address']['locationName']) > 0:
            head,sep,tail = address['address']['locationName'].partition(' ')

            if tail=='':
                address['address']['locationName'] = ' '.join(['fucking',head]).title()
            else:
                address['address']['locationName'] = ' '.join([head,'fucking',tail]).title()

        else:
            address['address']['locationName'] = 'Some Fucking Building'.upper()
        
        state = address['address']['state']

        fucked_addresses.append(address['address'])

    return fucked_addresses, state

def commence_douchebaggery(contests):
    fucked_contests = {}
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
        "Kumquat",
        "McGeenus",
        "The Tooth",
        "Dicky Madoo",
        "Big Kahuna Burger",
        "Eye of the Tiger"]

    for contest in contests:
        if 'office' in  contest:
            pprint(contest)
            
            fucked_contests[contest.get('office', "Some Fucking Office").title()] = []
            candidates = contest.get('candidates', [])

            for candidate in candidates:
                middle_name = choice(middle_names)
                head,sep,tail = candidate.partition(' ')

                if tail=='':
                    fucked_contests[contest].append(' '.join([middle_name, head]).title())
                else:
                    fucked_contests[contest].append(' '.join([head, middle_name, tail]).title())

    return fucked_contests

def call_api(address):
    """Queries the VIP Google API with the given address.

    Positional arguments:
    address -- A registered address
    """
    CIVIC_API_BASE_URL = "https://www.googleapis.com/civicinfo/us_v1/voterinfo/{election_id}/lookup?key={key}"

    election_id = 4000
    headers = {
        "content-type": "application/json",
        "accept-encoding": "gzip",
        "user-agent": "YFPP (gzip)",
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
    result = call_api(reg_address)
    addresses = []

    # figure out if there's anything of use
    if result is not None:
        if result['status']=="success" :
            return (result.get('pollingLocations',[]),
            result.get('contests', []),
            result.get('normalizedInput',[]),
            result['status'])

    return ([], [], [], result['status'])

def fucking_check(request):
    if not request.POST['address']:
        return HttpResponseRedirect(reverse('home'))
    else:
        request.session['exception'] = 'None'
        try:
            addresses, contests, normalized_address, status = get_fucking_election_shit(request.POST['address'])
        except Exception, e:
            addresses, contests, normalized_address, status = get_fucking_election_shit(request.POST['address'])
            request.session['exception'] = str(e)
        request.session['addresses'] = addresses
        request.session['contests'] = contests
        request.session['normalized_address'] = normalized_address
        request.session['status'] = status
        request.session['original_address'] = request.POST['address']

    # Always return an HttpResponseRedirect after successfully dealing
    # with POST data. This prevents data from being posted twice if a
    # user hits the Back button.
    return HttpResponseRedirect(reverse('results'))

def federal_only(contests):
    for x in contests:
        if 'level' in x and x['level'] == 'federal':
            yield x

def clean_candidates(contests):
    # This takes federal candidates and cleans them
    contests = list(contests)
    try:
        x = len(contests) - 1
        while x >= 0:
            if contests[x]['office'] == 'President & Vice President':
                contests[x]['election'] = 'President'
                contests[x]['priority'] = 1
            elif contests[x]['district']['scope'] == 'congressional':
                contests[x]['election'] = 'House'
                contests[x]['priority'] = 3
            else:
                contests[x]['election'] = 'Senate'
                contests[x]['priority'] = 2
            x = x - 1
        contests = sorted(contests, key=lambda k: k['priority']) 
    except Exception, e:
        print e
    return contests

def results(request):
    exception = request.session['exception']
    addresses = request.session['addresses']
    contests = request.session['contests']
    normalized_address = request.session['normalized_address']
    status = request.session['status']
    original_address = request.session['original_address']
    state = ""

    if len(addresses) > 0:
        #directions_urls = directionalize(addresses)
        addresses, state = fuck_addresses(addresses)
        #contests = commence_douchebaggery(contests)
    contests = clean_candidates(federal_only(contests))

    return render_to_response('yfpp/results.html', {
            'addresses': addresses,
            'greeting': '',#get_greeting(),
            'original_address': original_address,
            'contests': contests,
            'normalized_address': normalized_address,
            'status': status,
            'exception': exception,
    }, context_instance=RequestContext(request))

def client(request):
    return render_to_response('yfpp/client.html', {},context_instance=RequestContext(request))
