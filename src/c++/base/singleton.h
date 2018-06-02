
#pragma once

#define SINGLETON_CLASS( cls ) friend class Singleton< cls >;
#define IMPLEMENT_SINGLETON_CLASS( cls ) cls* Singleton< cls >::m_instance = NULL;

template< typename T >
class Singleton
{
protected:
	Singleton()
	{
	}

public:

	static T* Instance()
	{
		return m_instance;
	}

	static bool CreateInstance()
	{
		if( m_instance )
		{
			return false;
		}

		m_instance = new T();
		return true;
	}

	static bool DestroyInstance()
	{
		if( !m_instance )
		{
			return false;
		}

		delete m_instance;
		m_instance = NULL;
		return true;
	}

private:

	static T* m_instance;
};