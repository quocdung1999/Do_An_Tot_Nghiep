<?php

namespace local_wsgetreports\privacy;

class provider implements \core_privacy\local\metadata\null_provider
{
    /**
     * Get the language string identifier with the component's language
     * file to explain why this plugin stores no data.
     *
     * @return  string
     */
    public static function get_reason() : string {
        return 'privacy:metadata';
    }
}