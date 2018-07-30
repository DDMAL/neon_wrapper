from rodan.jobs.base import RodanTask

class Neon2(RodanTask):
    name = 'Neon2'
    author = 'Juliette Regimbal & Zoe McLennan'
    description = 'Neon Editor Online'
    settings = {}
    enabled = True
    category = 'Pitch Correction'
    interactive = True

    input_port_types = [
            {
                'name': 'OMR',
                'minimum': 1,
                'maximum': 1,
                'resource_types': ['application/mei+xml']
            },
            {
                'name': 'Background',
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
        c = {
            'meifile': inputs['OMR'][0]['resource_url'],
            'bgimg': inputs['Background'][0]['resource_url']
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
        return { '@done': True, '@user_input': user_input['user_input'] }

    def my_error_information(self, exc, traceback):
        pass
