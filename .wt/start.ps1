$TESTING = $true
$INTERACTIVE = $true


# Functions to make command building predictable
function join {
    param(
        $strings,
        $delimiter
    )
    return $strings -join $delimiter
}

function spaced {
    param ( $strings )
    return join -strings $strings -delimiter ' '
}

function delimited {
    param ( $strings )
    return join -strings $strings -delimiter ' `; '
}

function combine {
    # Suffix is a prejoined string.
    # Strings is an array of strings
    param ( $strings, $suffix )
    $temp = join -strings $str
    return join -strings $temp, $suffix
}

function exec{ param( $cmd ); return $( If ( $TESTING ){ echo $cmd } Else { Invoke-Expression $cmd } ) }
#function exec{ param( $cmd ); echo $cmd }

function main(){

    if ( $Testing ){ clear }
    
    $target = '~/Examples/markdown-editor/'
    $wt_root = $target + '.wt/'

    # Tab colors
    $colors = @{
        blue = '"#7757ff"' ;
        green = '"#b1fc83"';
        red = '"#e0b19d"';
        yellow = '"#fde0b0"';
        purple = '"#aa57cc"';
    }
   
    # premade arguements because I don't want to write them again
    $_args = spaced -strings '--profile', 'PowerShell', 'powershell.exe' 

    $dev = spaced -strings '--title', 'Bash', $_args, '-Command', 'bash', '--rcfile', ( $wt_root + '.devrc' )
    $api = spaced -strings $_args, '-Command bash', '--rcfile', ( $wt_root + '.apirc' ) ;
    $react = spaced -strings $_args, '-Command bash', '--rcfile', ( $wt_root + '.reactrc' ) ;

    if ( $INTERACTIVE ){
        If ( $( Read-Host "Enter mode 'T' to run a test or enter anything else to continue" ) -eq 'T' 
            ){ $TESTING = $true } 
        Else { $TESTING = $false }
    }

    # Might appear stupid, but it done to apply the powershell profile to bash.
    # Multiline expressions are not very meta.
    # open a browser window since we will need one.
        
    # Building the first window
    $pane1 = spaced -strings 'wt', '--tabColor', $colors[ 'blue' ]
    $pane1 = spaced -strings $pane1, $dev

    $pane2 = spaced -strings 'sp', '--horizontal', '--tabColor', $colors[ 'yellow' ]
    $pane2 = spaced -strings $pane2, $dev

    $window1 = delimited -strings $pane1, $pane2

    exec -cmd $window1 

    # Building the second window

    $pane1 = spaced -strings 'wt', 'nt', '--tabColor', $colors[ 'green' ], '--title', 'React'
    $pane1 = spaced -strings $pane1, $react

    $pane2 = spaced -strings 'sp', '--horizontal', '--tabColor', $colors[ 'red' ], '--title', 'Node-Typescript'
    $pane2 = spaced -strings $pane2, $api

    $pane3 = spaced -strings 'nt', '--tabColor', $colors[ 'purple' ]
    $pane3 = spaced -strings $pane3, $dev

    $window2 = delimited -strings ( $pane1, $pane2, $pane3 )

    exec -cmd $window2

    exit

}

main
