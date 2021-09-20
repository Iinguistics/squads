<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01 Transitional//EN' 'http://www.w3.org/TR/html4/loose.dtd'>
      <html>
      <head>
      <meta http-equiv='Content-Type' content='text/html; charset=utf-8'>
      <title>@yield('title')</title>
      <link href='https://fonts.googleapis.com/css?family=Montserrat:300,400,600' rel='stylesheet'>
      <style>
        body {
          font-family: Montserrat, Helvetica, Arial, sans-serif;
          background-color: #ffffff;
          color: #14222e;
        }
        p {
          font-size: 14px;
          font-weight: 400;
        }
        a {
          font-weight: 400;
          color: #d85a3e;
          font-size: inherit;
          text-decoration: none;
        }
        thead > tr > th,
        tbody > tr > td,
        tfoot > tr > td {
          text-align: left;
          padding: 0 15px;
        }
        thead >tr > th {
          height: 72px;
          line-height: 72px;
          font-weight: 600;
          font-size: 18px;
          background: #1d3041;
          color: #ffffff;
        }
        tbody > tr > td {
          padding: 10px 15px;
        }
        tfoot > tr > td {
          height: 44px;
          line-height: 44px;
          font-size: 14px;
          border-top: 1px solid #ccc;
          border-bottom: 1px solid #ccc;
          font-weight: 300;
        }
      </style>
      </head>
      <body>
        <table>
          <thead>
            <tr>
              <th>@yield('title')</th>
            </tr>
          </thead>
          <tbody><tr><td>@yield('content')<br /></td></tr></tbody>
          <tfoot>
            <tr>
              <td>Copyright &copy; {{date("Y") }} Squads. All rights Reserved.</td>
            </tr>
          </tfoot>
        </table>
    </body>
    </html>