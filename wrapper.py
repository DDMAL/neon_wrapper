from rodan.jobs.base import RodanTask


class Neon(RodanTask):
    name = 'Neon'
    author = 'Juliette Regimbal & Zoe McLennan'
    description = 'Neume Editor Online'
    settings = {}
    enabled = True
    category = 'Pitch Correction'
    interactive = True

    autosave = False
    autosaveData = ""

    input_port_types = [
        {
            'name': 'MEI',
            'minimum': 1,
            'maximum': 1,
            'resource_types': ['application/mei+xml']
        },
        {
            'name': 'Image',
            'minimum': 1,
            'maximum': 1,
            'resource_types': ['image/rgba+png']
        },
    ]
    output_port_types = [
        {
            'name': 'Corrected',
            'minimum': 1,
            'maximum': 1,
            'resource_types': ['application/mei+xml']
        },
    ]

    def get_my_interface(self, inputs, settings):
        t = 'editor.html'
        c = {}
        if self.autosave is True:
            # Use autosaveData for file
            c = {
                'meifile': self.autosaveData,
                'bgimg': inputs['Image'][0]['resource_url'],
                'data': 'true'
            }
        else:
            c = {
                'meifile': inputs['MEI'][0]['resource_url'],
                'bgimg': inputs['Image'][0]['resource_url'],
                'data': 'false'
            }
        return (t, c)

    def run_my_task(self, inputs, settings, outputs):
        if '@done' not in settings:
            return self.WAITING_FOR_INPUT()
        outfile_path = outputs['Corrected'][0]['resource_path']
        outfile = open(outfile_path, 'w')
        correctedMEI = settings['@user_input']
        outfile.write(correctedMEI)
        outfile.close()
        return True

    def validate_my_user_input(self, inputs, settings, user_input):
        if user_input['mode'] == 'autosave':
            self.autosave = True
            self.autosaveData = user_input['user_input']
            return self.WAITING_FOR_INPUT()
        elif user_input['mode'] == 'revert':
            self.autosave = False
            self.autosaveData = ""
            return self.WAITING_FOR_INPUT()
        return {'@done': True, '@user_input': user_input['user_input']}

    def my_error_information(self, exc, traceback):
        pass
