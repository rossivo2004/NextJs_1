import TabPageProfile from '../../../../components/TabPageProfile'

function ProFilePage() {
    return (
      <div className='bg-white lg:px-40 mb-20 py-4'>
      <div className="mb-4">
      <ol className="flex items-center whitespace-nowrap">
        <li className="inline-flex items-center">
          <a className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500" href="#">
            Home
          </a>
          <svg className="flex-shrink-0 mx-2 overflow-visible size-4 text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </li>
        <li className="inline-flex items-center text-sm font-semibold text-primary truncate dark:text-neutral-200" aria-current="page">
          Profile
        </li>
      </ol>
    </div>
        <TabPageProfile />
      </div>
    );
}

export default ProFilePage;