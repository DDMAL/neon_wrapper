from rodan.jobs.base import RodanTask

class Neon2(RodanTask):
    name = 'Neon2'
    author = 'Juliette Regimbal & Zoe McLennan'
    description = 'Neon Editor Online'
    settings = {}
    enabled = True
    category = 'Pitch Correction'
    interactive = False # Change to True when we have interactive part to task
    
    input_port_types = [
            {
                'name': 'OMR MEI',
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
                'name': 'Test',
                'minimum': 1, 
                'maximum': 1,
                'resource_types': ['application/mei+xml']
            },
    ]

    def get_my_interface(self, inputs, settings):
        t = 'editor.html'
        c = {
            'meifile': inputs['OMR MEI'][0]['resource_url'],
            'bgimg': inputs['Background'][0]['resource_url']
        }
        return (t, c)

    def run_my_task(self, inputs, settings, outputs):
        if '@done' not in settings:
            return self.WAITING_FOR_INPUT()
        outfile_path = outputs['Test'][0]['resource_path']
        outfile = open(outfile_path, 'w')
        outfile.write("<mei></mei>")
        outfile.close()
        return True

    def validate_my_user_input(self, inputs, settings, user_input):
        return { '@done': True, '@user_input': user_input['user_input'] }

    def my_error_information(self, exc, traceback):
        pass

