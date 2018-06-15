from rodan.jobs.base import RodanTask

class Neon2(RodanTask):
    name = 'Neon2'
    author = ''
    description = 'Neon Editor Online'
    settings = {}
    enabled = True
    category = 'Pitch Correction'
    interactive = False # Change to True when we have interactive part to task
    
    input_port_types = (
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
        )

    output_port_types = (
            {
                'name': 'Corrected MEI',
                'minimum': 1,
                'maximum': 1,
                'resource_types': ['application/mei+xml']
            },
        )

    def run_my_task(self, inputs, settings, outputs):
        outfile_path = outputs['Corrected MEI'][0]['resource_path']
        outfile = open(outfile_path, 'w')
        outfile.write("<mei></mei>")
        outfile.close()
        return True

'''
    def get_my_interface(self, inputs, settings):
        pass

    def validate_my_user_input(self, inputs, settings, user_input):
        pass

    def my_error_information(self, exc, traceback):
        pass
'''
