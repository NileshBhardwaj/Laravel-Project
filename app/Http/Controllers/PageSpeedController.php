<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PageSpeedController extends Controller
{
    public function analyze(Request $request)
    {
        $url = $request->input('url');
        // Check if the URL is secure
        if (!preg_match("/^https:\/\//i", $url)) {
            return response()->json([
                'code' => 403,
                'message' => 'SSL is required to perform this operation.',
            ], 403);
        }

        $api = 'AIzaSyAbqdwJVaki6lpSnk5I_zRiY43cyYXo5uA';
        $url = $request->input('url');
        $url_sh = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=".$url."&key=".$api;

        $curl = curl_init();
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($curl, CURLOPT_TIMEOUT, 200);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, TRUE);
        curl_setopt($curl, CURLOPT_URL,$url_sh);

        $result=curl_exec($curl);
        curl_close($curl);

        $resultArray = json_decode($result, true);
            
            $data = [
                // 'captchaResult' => $resultArray['captchaResult'],
                // 'kind' => $resultArray['kind'],
                // 'id' => $resultArray['id'],
                'loadingExperience' => $resultArray['loadingExperience'],
                
                //   'originLoadingExperience' => $resultArray['originLoadingExperience'],
                
                 'lighthouseResult' => $resultArray['lighthouseResult'],
            ];
      
    
        return response()->json($data);
    }
}
